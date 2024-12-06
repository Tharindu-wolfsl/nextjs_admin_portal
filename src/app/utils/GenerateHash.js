import bcrypt from 'bcrypt';

class GenerateHash {
    constructor({plaintext, saltRounds, hash = ''}) {
        Object.assign(this, {plaintext, saltRounds, hash});
        console.log(this);
    }
    async getHash() {
        return await bcrypt.hashSync(this.plaintext, this.saltRounds);
    }

    async comparePassword() {
        return await bcrypt.compareSync(this.plaintext, this.hash); // true
    }

}

export default GenerateHash;