package com.tecnositaf.fleetmanager.domains.users;

import com.tecnositaf.fleetmanager.domains.roles.ERole;
import com.tecnositaf.fleetmanager.domains.roles.Role;
import com.tecnositaf.fleetmanager.domains.roles.RoleRepository;
import com.tecnositaf.fleetmanager.request.LoginRequest;
import com.tecnositaf.fleetmanager.request.RegisterRequest;
import com.tecnositaf.fleetmanager.response.JwtResponse;
import com.tecnositaf.fleetmanager.response.MessageResponse;
import com.tecnositaf.fleetmanager.security.jwt.JwtUtils;
import com.tecnositaf.fleetmanager.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/fleet/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        List<String> strRoles = signUpRequest.getRole();
        List<Role> roles = new LinkedList<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.COMPANY)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("ADMIN".equals(role)) {
                    Role adminRole = roleRepository.findByName(ERole.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else if ("COMPANY".equals((role))) {
                    Role companyRole = roleRepository.findByName(ERole.COMPANY)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(companyRole);
                } else if("DRIVER".equals(role)){
                    Role driverRole = roleRepository.findByName(ERole.DRIVER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(driverRole);
                }
            });
        }
        user.setRole(roles);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}
