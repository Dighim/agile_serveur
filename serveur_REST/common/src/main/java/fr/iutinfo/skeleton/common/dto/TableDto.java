package fr.iutinfo.skeleton.common.dto;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TableDto {
	final static Logger logger = LoggerFactory.getLogger(TableDto.class);
	private int idTable;
	private String intitule;
	private boolean publique;
	private int durée;
	private String lieu;
	private LocalDate date;
	private int nbPers;
}
