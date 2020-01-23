package com.joaodematejr.api.responses;

import java.util.List;

public class Response<T>{

	private T data;
	private List<String> errs;
	
	public Response(T data) {
		this.data = data;
	}
	
	public Response(List<String> errs) {
		this.errs = errs;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public List<String> getErrs() {
		return errs;
	}

	public void setErrs(List<String> errs) {
		this.errs = errs;
	}
	
	
}
