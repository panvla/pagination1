package com.vladimirpandurov.paginationB.service.implementation;


import com.vladimirpandurov.paginationB.model.User;
import com.vladimirpandurov.paginationB.repostiory.UserRepository;
import com.vladimirpandurov.paginationB.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public Page<User> getUsers(String name, int page, int size) {
        log.info("Fetching users from page {} of size {}", page, size);
        return userRepository.findByNameContaining(name, PageRequest.of(page, size));
    }
}
