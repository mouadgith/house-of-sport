class Profile {
    constructor(id, nom, prenom, email, numTel, adresse, avatar = null) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.numTel = numTel;
        this.adresse = adresse;
        this.avatar = avatar;
    }

    get fullName() {
        return `${this.prenom} ${this.nom}`;
    }

    toJSON() {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            numTel: this.numTel,
            adresse: this.adresse,
            avatar: this.avatar,
        };
    }

    static fromJSON(json) {
        return new Profile(
            json.id,
            json.nom,
            json.prenom,
            json.email,
            json.numTel,
            json.adresse,
            json.avatar
        );
    }
}

export default Profile; 