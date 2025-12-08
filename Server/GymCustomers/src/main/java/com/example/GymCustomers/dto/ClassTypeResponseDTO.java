package com.example.GymCustomers.dto;

public class ClassTypeResponseDTO {
    
    private Long typeId;
    private String typeName;

    // Getters and Setters
    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
