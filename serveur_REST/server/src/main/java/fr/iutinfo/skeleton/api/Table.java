package fr.iutinfo.skeleton.api;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.UserDto;

public class Table {
	final static Logger logger = LoggerFactory.getLogger(Table.class);
	private int idTable;
	private String intitule;
	private boolean publique;
	private int durée;
	private String lieu;
	private LocalDate date;
	private int nbPers;
	
	public Table(int idTable, String intitule, boolean publique, int durée, String lieu, LocalDate date, int nbPers) {
		super();
		this.idTable = idTable;
		this.intitule = intitule;
		this.publique = publique;
		this.durée = durée;
		this.lieu = lieu;
		this.date = date;
		this.nbPers = nbPers;
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
	public int getDurée() {
		return durée;
	}
	public void setDurée(int durée) {
		this.durée = durée;
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
