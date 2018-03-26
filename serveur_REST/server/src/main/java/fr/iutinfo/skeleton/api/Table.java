package fr.iutinfo.skeleton.api;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.TableDto;


public class Table{
	final static Logger logger = LoggerFactory.getLogger(Table.class);
	private int idTable;
	private String intitule;
	private boolean publique;
	private double duree;
	private String lieu;
	private String date;
	private int nbPers;
	private List<User> participants;
	private int crea;
	
	public List<User> getParticipants() {
		return participants;
	}

	public void setParticipants(List<User> participants) {
		this.participants = participants;
	}

	public int getCrea() {
		return crea;
	}

	public void setCrea(int crea) {
		this.crea = crea;
	}

	public Table() {
    }
	
	public void initFromDto(TableDto dto) {
    	this.setIdTable(dto.getIdTable());
        this.setIntitule(dto.getIntitule());
        this.setPublique(dto.isPublique());
        this.setDuree(dto.getDuree());
        this.setLieu(dto.getLieu());
        this.setDate(dto.getDate());
        this.setNbPers(dto.getNbPers());
        this.setCrea(dto.getCrea());
    }
	
	public double getDuree() {
		return duree;
	}

	public void setDuree(double duree) {
		this.duree = duree;
	}

	public int getIdTable() {
		return idTable;
	}
	public void setIdTable(int idTable) {
		this.idTable = idTable;
	}
	public String getIntitule() {
		return intitule;
	}
	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}
	public boolean isPublique() {
		return publique;
	}
	public void setPublique(boolean publique) {
		this.publique = publique;
	}
	public String getLieu() {
		return lieu;
	}
	public void setLieu(String lieu) {
		this.lieu = lieu;
	}
	
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getNbPers() {
		return nbPers;
	}
	public void setNbPers(int nbPers) {
		this.nbPers = nbPers;
	}
	
	public TableDto convertToDto() {
		TableDto dto = new TableDto();
		dto.setIdTable(this.getIdTable());
		dto.setIntitule(this.getIntitule());
		dto.setPublique(this.isPublique());
		dto.setDuree(this.getDuree());
		dto.setLieu(this.getLieu());
		dto.setDate(this.getDate());
		dto.setNbPers(this.getNbPers());
		dto.setCrea(this.getCrea());
        return dto;
    }
}
