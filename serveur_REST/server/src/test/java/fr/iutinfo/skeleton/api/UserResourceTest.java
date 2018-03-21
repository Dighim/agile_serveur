package fr.iutinfo.skeleton.api;

import javax.ws.rs.core.Application;

import org.glassfish.jersey.test.JerseyTest;
import org.junit.Before;

public class UserResourceTest extends JerseyTest {

    @Override
    protected Application configure() {
        return new Api();
    }

    @Before
    public void init() {
        Helper.initDb();
    }
}
