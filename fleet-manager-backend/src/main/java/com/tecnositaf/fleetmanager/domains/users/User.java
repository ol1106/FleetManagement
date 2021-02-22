package com.tecnositaf.fleetmanager.domains.users;


import com.tecnositaf.fleetmanager.domains.roles.Role;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class User {

    @Id
    private String id;

    @NotNull
    @Size(min = 3,max = 20)
    private String username;

    @NotNull
    @Size(max=120)
    private String password;

// @NotNull
    @Email
    @Size(max=30)
    private String email;

    private List<Role> role;

    public User() {

    }
    public User(String username,String email,String password) {
        this.username=username;
        this.password=password;
        this.email=email;
    }
}
