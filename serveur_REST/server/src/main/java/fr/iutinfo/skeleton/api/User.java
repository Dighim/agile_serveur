package fr.iutinfo.skeleton.api;

import com.google.common.base.Charsets;
import com.google.common.hash.Hasher;
import com.google.common.hash.Hashing;
import fr.iutinfo.skeleton.common.dto.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.security.SecureRandom;

public class User implements Principal {
    final static Logger logger = LoggerFactory.getLogger(User.class);
    private static User anonymous = new User(-1, "Anonymous", "anonym");
    private String user;
    private String fname;
    private String lname;
    private int id = 0;
    private String password;
    private String passwdHash;
    private String salt;
    private String search;

    public User(int id, String name) {
        this.id = id;
        this.user = name;
    }

    public User(int id, String name, String alias) {
        this.id = id;
        this.user = name;
        this.fname = alias;
    }

    public User() {
    }

    
    
    public static User getAnonymousUser() {
        return anonymous;
    }
   
    public String getlname() {
    	return this.lname;
    }
    
    public void setlname(String lname) {
    	this.lname = lname;
    }
    
    public String getfname() {
    	return this.fname;
    }
    
    public void setfname(String fname) {
    	this.fname = fname;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return user;
    }

    public void setName(String name) {
        this.user = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        passwdHash = buildHash(password, getSalt());
        this.password = password;
    }

    private String buildHash(String password, String s) {
        Hasher hasher = Hashing.sha256().newHasher();
        hasher.putString(password + s, Charsets.UTF_8);
        return hasher.hash().toString();
    }

    public boolean isGoodPassword(String password) {
        if (isAnonymous()) {
            return false;
        }
        String hash = buildHash(password, getSalt());
        return hash.equals(getPasswdHash());
    }

    public String getPasswdHash() {
        return passwdHash;
    }

    public void setPasswdHash(String passwdHash) {
        this.passwdHash = passwdHash;
    }

    @Override
    public boolean equals(Object arg) {
        if (getClass() != arg.getClass())
            return false;
        User user = (User) arg;
        return user.equals(user.user) && fname.equals(user.fname) && passwdHash.equals(user.getPasswdHash()) && salt.equals((user.getSalt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((fname == null) ? 0 : fname.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((passwdHash == null) ? 0 : passwdHash.hashCode());
        result = prime * result + ((salt == null) ? 0 : salt.hashCode());
        return result;
    }
    
    @Override
    public String toString() {
        return id + ": " + fname + ", " + user;
    }

    public String getAlias() {
        return fname;
    }

    public void setAlias(String alias) {
        this.fname = alias;
    }

    public String getSalt() {
        if (salt == null) {
            salt = generateSalt();
        }
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    private String generateSalt() {
        SecureRandom random = new SecureRandom();
        Hasher hasher = Hashing.sha256().newHasher();
        hasher.putLong(random.nextLong());
        return hasher.hash().toString();
    }

    public void resetPasswordHash() {
        if (password != null && !password.isEmpty()) {
            setPassword(getPassword());
        }
    }

    public boolean isInUserGroup() {
        return !(id == anonymous.getId());
    }

    public boolean isAnonymous() {
        return this.getId() == getAnonymousUser().getId();
    }

    public String getSearch() {
        search = user + " " + fname;
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public void initFromDto(UserDto dto) {
        this.setId(dto.getId());
        this.setfname(dto.getfname());
        this.setlname(dto.getlname());
        this.setPassword(dto.getPassword());
    }

    public UserDto convertToDto() {
        UserDto dto = new UserDto();
        dto.setlname(this.lname);
        dto.setfname(this.fname);
        dto.setId(this.getId());
        dto.setPassword(this.getPassword());
        return dto;
    }
}
