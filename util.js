import bycrypt from "bcrypt"

export async function CriarHash(senha, salts) {
    const hash = await bycrypt.hash(senha, salts);
    console.log(hash);
    return hash
}