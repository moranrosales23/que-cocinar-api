module.exports = function Paginate(schema, options) {
  schema.query.paginate = async function ({ page = 1, limit = 10 }) {
    const pagination = {
      limit,
      page,
      count: 0,
    };
    const offset = (page - 1) * limit;

    const [data, count] = await Promise.all([
      this.limit(pagination.limit).skip(offset),
      this.model.countDocuments(this.getQuery()),
    ]);
    pagination.count = count;
    return { data, pagination };
  };
};
