package com.vladimirpandurov.paginationB.service;


import com.vladimirpandurov.paginationB.model.User;
import org.springframework.data.domain.Page;

public interface UserService {

    Page<User> getUsers(String name, int page, int size);
}
