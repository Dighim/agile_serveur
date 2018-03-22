package fr.iutinfo.skeleton.api;

import static fr.iutinfo.skeleton.api.BDDFactory.getDbi;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/table")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class TableResource {
	final static Logger logger = LoggerFactory.getLogger(UserResource.class);
    private static TableDao dao = getDbi().open(TableDao.class);

}
