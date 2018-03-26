package fr.iutinfo.skeleton.common.dto;
import java.time.LocalDateTime;

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.api.LocalDateTimeAdapter;

public class TableDto {
	final static Logger logger = LoggerFactory.getLogger(TableDto.class);
	private int idTable;
	private String intitule;
	private boolean publique;
	private double duree;
	private String lieu;
	@XmlJavaTypeAdapter(LocalDateTimeAdapter.class)
	private LocalDateTime date;
	private int nbPers;
	private int crea;

	
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
	public double getDuree() {
		return duree;
	}
	public void setDuree(double duree) {
		this.duree = duree;
	}
	public String getLieu() {
		return lieu;
	}
	public void setLieu(String lieu) {
		this.lieu = lieu;
	}
	
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public int getNbPers() {
		return nbPers;
	}
	public void setNbPers(int nbPers) {
		this.nbPers = nbPers;
	}
	public int getCrea() {
		return crea;
	}
	public void setCrea(int crea) {
		this.crea = crea;
	}
}
