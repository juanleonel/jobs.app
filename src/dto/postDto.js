class PostDTO {
  constructor(
    id,
    title,
    summary,
    categoryId,
    termId,
    userId,
    salary,
    image,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.categoryId = categoryId;
    this.termId = termId;
    this.userId = userId;
    this.salary = salary;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = PostDTO;
