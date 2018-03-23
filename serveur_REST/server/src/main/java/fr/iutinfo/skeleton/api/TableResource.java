package fr.iutinfo.skeleton.api;

import static fr.iutinfo.skeleton.api.BDDFactory.getDbi;
import static fr.iutinfo.skeleton.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.time.LocalDate;
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

@Path("/table")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class TableResource {
	final static Logger logger = LoggerFactory.getLogger(UserResource.class);
    private static TableDao dao = getDbi().open(TableDao.class);
    
    public TableResource() throws SQLException {
		if (!tableExist("tables")) {
			logger.debug("Create table table de jeux");
			dao.createBaseTable();
			dao.insert(new Table(0, "solitaire",false, 0.5, "chez moi", LocalDate.now(),1)); 
		}
	}
    
    @POST
	public TableDto createTable(TableDto dto){
		Table table = new Table();
		table.initFromDto(dto);
		int id = dao.insert(table);
		dto.setIdTable(id);
		return dto;
	}
    
    @GET
	@Path("/{idTable}")
	public TableDto getTable(@PathParam("idTable") int idTable) {
		Table table = dao.findById(idTable);
		if (table == null) {
			throw new WebApplicationException(404);
		}
		return table.convertToDto();
	}
    
    @GET
	public List<TableDto> getAllTables(@QueryParam("q") String query) {
		List<Table> tables;
		if (query == null) {
			tables = dao.all();
		} else {
			logger.debug("Search tables with query: " + query);
			tables = dao.search("%" + query + "%");
		}
		return tables.stream().map(Table::convertToDto).collect(Collectors.toList());
	}

	@DELETE
	@Path("/{id}")
	public void deleteTable(@PathParam("id") int id) {
		dao.delete(id);
	}

}
