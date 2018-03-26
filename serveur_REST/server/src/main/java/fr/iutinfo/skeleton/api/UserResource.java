package fr.iutinfo.skeleton.api;

import static fr.iutinfo.skeleton.api.BDDFactory.getDbi;
import static fr.iutinfo.skeleton.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.TableDto;
import fr.iutinfo.skeleton.common.dto.UserDto;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
	final static Logger logger = LoggerFactory.getLogger(UserResource.class);
	private static UserDao dao = getDbi().open(UserDao.class);

	public UserResource() throws SQLException {
		if (!tableExist("users")) {
			logger.debug("Crate table users");
			dao.createUserTable();
			dao.insert(new User(0, "Margaret Thatcher", "la Dame de fer"));
		}
	}

	@POST
	public UserDto createUser(UserDto dto) throws WebApplicationException{
		if (dao.findByName(dto.getUser()) != null) throw new WebApplicationException(Status.CONFLICT);
		User user = new User();
		user.initFromDto(dto);
		user.resetPasswordHash();
		logger.debug("PasswdHash : " + user.getPasswdHash());
		int id = dao.insert(user);
		dto.setId(id);
		return dto;
	}
	
	@GET
	@Path("/{id}/tables")
	public List<TableDto> getTablesFromUser(@PathParam("id") int id) throws SQLException{
		TableDao tDao = getDbi().open(TableDao.class);
		if (!tableExist("inscriptions")) {
    		logger.debug("Create table des inscription à une table");
    		tDao.createInsTable();
    	}
		List <Table> tables = dao.listTable(id);		
		return tables.stream().map(Table::convertToDto).collect(Collectors.toList());
	}

	@GET
	public List<UserDto> getAllUsers(@QueryParam("q") String query) {
		List<User> users;
		if (query == null) {
			users = dao.all();
		} else {
			logger.debug("Search users with query: " + query);
			users = dao.search("%" + query + "%");
		}
		return users.stream().map(User::convertToDto).collect(Collectors.toList());
	}
	
	@GET
	@Path("/{user}")
	public UserDto getUserByNom(@PathParam("user") String user) {
		return dao.findByName(user).convertToDto();				
	}

	@DELETE
	@Path("/{id}")
	public void deleteUser(@PathParam("id") int id) {
		dao.delete(id);
	}

}
