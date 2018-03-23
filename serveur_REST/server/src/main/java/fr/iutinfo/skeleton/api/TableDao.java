package fr.iutinfo.skeleton.api;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

public interface TableDao {
	@SqlUpdate("create table tables (idTable integer primary key autoincrement,intitule varchar(1000),publique boolean,duree double,lieu varchar(100),date Timestamp,nbPers integer,nbPart varchar,int crea)")
    void createBaseTable();
	
	@SqlUpdate("create table inscriptions (idUser integer not null references users(id),idTable integer not null references tables(idTable), primary key (idUser, idTable))")
    void createInsTable();
	
	@SqlQuery("select * from inscriptions join users on users.id=idUser where idTable = :idTable")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<User> listUser(@Bind("idTable") int idTable);
	
	@SqlQuery("insert into inscriptions values(:idUser,:idTable)")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<User> inscription(@Bind("idTable") int idTable,@Bind("idUser") int idUser);
	
	@SqlUpdate("insert into tables (intitule,publique,duree, lieu,date,nbPers) values (:intitule, :publique, :duree, :lieu, :date, :nbPers)")
    @GetGeneratedKeys
    int insert(@BindBean() Table table);
	
	@SqlQuery("select * from tables where intitule = :intitule")
    @RegisterMapperFactory(BeanMapperFactory.class)
    Table findByTableName(@Bind("intitule") String intitule);
	
	@SqlQuery("select * from tables where search like :intitule")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Table> search(@Bind("intitule") String intitule);
	
	@SqlUpdate("drop table if exists tables")
	void dropUserTable();
	
	@SqlUpdate("delete from tables where idTable = :id")
    void delete(@Bind("id") int id);
	
	@SqlQuery("select * from tables order by idTable")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Table> all();
	
	@SqlQuery("select * from tables where idTable = :id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    Table findById(@Bind("id") int id);

    void close();
	
	 
	 
	
	
}
