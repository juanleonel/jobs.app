class UserDTO {
  constructor(
    id,
    name,
    lastName,
    email,
    password,
    isActive,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = UserDTO;
