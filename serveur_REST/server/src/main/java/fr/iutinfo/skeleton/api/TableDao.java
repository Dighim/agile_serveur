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
	@SqlUpdate("create table tables (idTable primary key autoincrement,nomTable varchar(100),intitule varchar(1000),publique boolean,duree integer,lieu varchar(100),date Date,nbPers integer)")
    void createBaseTable();
	
	@SqlUpdate("insert into tables (nomTable,intitule,publique,duree, lieu,date,nbPers) values (:nomTable, :intitule, :duree, :lieu, :date, :nbPers)")
    @GetGeneratedKeys
    int insert(@BindBean() Table table);
	
	@SqlQuery("select * from tables where nomTable = :nomTable")
    @RegisterMapperFactory(BeanMapperFactory.class)
    User findByTableName(@Bind("nomTable") String nomTable);
	
	@SqlQuery("select * from tables where search like :nomTable")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<User> search(@Bind("nomTable") String nomTable);
	
	@SqlUpdate("drop table if exists tables")
	void dropUserTable();
	
	@SqlUpdate("delete from tables where idTable = :id")
    void delete(@Bind("id") int id);
	
	@SqlQuery("select * from tables order by idTable")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Table> all();
	
	@SqlQuery("select * from tables where idTable = :id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    User findById(@Bind("id") int id);

    void close();
	
	 
	 
	
	
}
