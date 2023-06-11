INSERT INTO departments (id, name)
VALUES (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal"),
    (1, "Sales");

INSERT INTO roles (title, department_id, salary)
VALUES ("Sales Lead", 1, 115000), 
("Salesperson", 1, 100000), 
("Lead Engineer", 2, 200000),
("Software Engineer", 2, 150000),
("Account Manager", 3, 175000),
("Accountant", 3, 120000),
("Legal Team Lead", 4, 270000),
("Lawyer", 4, 200000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Peterson", 1, null),
("Billy", "Quier", 2, 1),
("Colton", "Merritt", 3, null),
("Marissa", "Reppert", 4, 3),
("Catherine", "Pribanich", 5, null),
("Christina", "Wellington", 6, 5),
("Sarah", "Emily", 7, null),
("Brian", "Engler", 8, 7);