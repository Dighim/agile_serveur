package fr.iutinfo.skeleton.api;

import java.security.Principal;
import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.TableDto;
import fr.iutinfo.skeleton.common.dto.UserDto;

public class Table implements Principal{
	final static Logger logger = LoggerFactory.getLogger(Table.class);
	private int idTable;
	private String intitule;
	private boolean publique;
	private double duree;
	private String lieu;
	//private LocalDate date;
	private int nbPers;
	
	/*public Table(int idTable, String intitule, boolean publique, double duree, String lieu, int nbPers) {
		super();
		
		this.idTable = idTable;
		this.intitule = intitule;
		this.publique = publique;
		this.duree = duree;
		this.lieu = lieu;
		//this.date = date;
		this.nbPers = nbPers;
	}*/
	
	public Table() {
    }
	
	public void initFromDto(TableDto dto) {
    	this.setIdTable(dto.getIdTable());
        this.setIntitule(dto.getIntitule());
        this.setPublique(dto.isPublique());
        this.setDuree(dto.getDuree());
        this.setLieu(dto.getLieu());
     //   this.setDate(dto.getDate());
        this.setNbPers(dto.getNbPers());
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
	/*public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}*/
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
		//dto.setDate(this.getDate());
		dto.setNbPers(this.getNbPers());
        return dto;
    }

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return "Table";
	}
}
