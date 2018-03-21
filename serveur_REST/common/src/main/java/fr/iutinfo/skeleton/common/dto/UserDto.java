package fr.iutinfo.skeleton.common.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserDto {
    final static Logger logger = LoggerFactory.getLogger(UserDto.class);
    private String user;
    private String fname;
	private String lname;
    private int id = 0;
    private String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getfname() {
        return fname;
    }

    public void setfname(String fname) {
        this.fname = fname;
    }


    public String getlname() {
        return lname;
    }

    public void setlname(String lname) {
        this.lname = lname;
    }
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
