const db = require('../../data/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
};

async function find() {
	return await db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
	return db("users").where(filter).orderBy("id");
}

async function add(user) {
	const [id] = await db("users").insert(user, "id");
	return findById(id);
}

function findById(id) {
	return db("users").where({
		id
	}).first();
}