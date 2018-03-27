package fr.iutinfo.skeleton.api;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

import java.util.List;

public interface UserDao {
    @SqlUpdate("create table users (id integer primary key autoincrement, user varchar(100), pseudo varchar(100), passwdHash varchar(64), salt varchar(64))")
    void createUserTable();

    @SqlUpdate("insert into users (user,pseudo,passwdHash, salt) values (:user, :pseudo, :passwdHash, :salt)")
    @GetGeneratedKeys
    int insert(@BindBean() User user);
    
    
    @SqlQuery("select * from users where pseudo = :pseudo")
    @RegisterMapperFactory(BeanMapperFactory.class)
    User findByPseudo(@Bind("pseudo") String pseudo);
    
    @SqlQuery("select * from users where user = :user")
    @RegisterMapperFactory(BeanMapperFactory.class)
    User findByName(@Bind("user") String user);
    
    @SqlQuery("select * from inscriptions join tables on tables.idTable=inscriptions.idTable where inscriptions.idTable = :id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Table> listTable(@Bind("id") int id);

    @SqlQuery("select * from users where search like :user")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<User> search(@Bind("user") String user);

    @SqlUpdate("drop table if exists users")
    void dropUserTable();

    @SqlUpdate("delete from users where id = :id")
    void delete(@Bind("id") int id);

    @SqlQuery("select * from users order by id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<User> all();

    @SqlQuery("select * from users where id = :id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    User findById(@Bind("id") int id);

    void close();
}
