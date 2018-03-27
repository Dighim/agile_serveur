package fr.iutinfo.skeleton.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.TableDto;


public class Table{
	final static Logger logger = LoggerFactory.getLogger(Table.class);
	private int idTable;
	private String intitule;
	private boolean publique;
	private String duree;
	private String lieu;
	private String date;
	private int nbPers;
	private int crea;
	private int etat;
	
	public int getEtat() {
		return etat;
	}

	public void setEtat(int etat) {
		this.etat = etat;
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
        this.setEtat(dto.getEtat());
        this.setDate(dto.getDate());
        this.setNbPers(dto.getNbPers());
        this.setCrea(dto.getCrea());
    }
	
	public String getDuree() {
		return duree;
	}

	public void setDuree(String duree) {
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
		dto.setEtat(this.getEtat());
		dto.setDate(this.getDate());
		dto.setNbPers(this.getNbPers());
		dto.setCrea(this.getCrea());
        return dto;
    }
}
