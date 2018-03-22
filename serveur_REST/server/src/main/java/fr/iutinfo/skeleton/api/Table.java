package fr.iutinfo.skeleton.api;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.UserDto;

public class Table {
	final static Logger logger = LoggerFactory.getLogger(Table.class);
	private String nomTable;
	private int idTable;
	private String intitule;
	private boolean publique;
	private int duree;
	private String lieu;
	private LocalDate date;
	private int nbPers;
	
	public Table(String nomTable,int idTable, String intitule, boolean publique, int duree, String lieu, LocalDate date, int nbPers) {
		super();
		this.nomTable=nomTable;
		this.idTable = idTable;
		this.intitule = intitule;
		this.publique = publique;
		this.duree = duree;
		this.lieu = lieu;
		this.date = date;
		this.nbPers = nbPers;
	}
	
	public String getNomTable() {
		return nomTable;
	}

	public void setNomTable(String nomTable) {
		this.nomTable = nomTable;
	}

	public int getDuree() {
		return duree;
	}

	public void setDuree(int duree) {
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
	public int getduree() {
		return duree;
	}
	public void setduree(int duree) {
		this.duree = duree;
	}
	public String getLieu() {
		return lieu;
	}
	public void setLieu(String lieu) {
		this.lieu = lieu;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public int getNbPers() {
		return nbPers;
	}
	public void setNbPers(int nbPers) {
		this.nbPers = nbPers;
	}
	
	/*  public TableDto convertToDto() {
		  	TableDto dto = new TableDto();
	        
	        return dto;
	    }*/
}
