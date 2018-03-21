package fr.iutinfo.skeleton.api;

import fr.iutinfo.skeleton.common.dto.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.GenericType;
import java.util.List;

public class Helper {
    private final static Logger logger = LoggerFactory.getLogger(Helper.class);
    private static final UserDao dao = BDDFactory.getDbi().open(UserDao.class);
    static GenericType<List<UserDto>> listUserResponseType = new GenericType<List<UserDto>>() {
    };

    public static void initDb() {
        dao.dropUserTable();
        dao.createUserTable();
    }

    static User createUserWithName(String name) {
        User user = new User(0, name);
        return createUser(user);
    }

    static User createUserWithAlias(String name, String alias) {
        User user = new User(0, name, alias);
        return createUser(user);
    }


    public static User createUserWithPassword(String name, String passwd, String salt) {
        User user = new User(0, name);
        user.setSalt(salt);
        user.setPassword(passwd);
        logger.debug("createUserWithPassword Hash : " + user.getPasswdHash());
        return createUser(user);
    }

    private static User createUser(User user) {
        int id = dao.insert(user);
        user.setId(id);
        return user;
    }
}
