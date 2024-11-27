
export class User {
    public id: string;
    public displayName: string;
    private email: string;
    private rating: Number;
    
    constructor(id: string, displayName: string, email: string, rating: number) {
        this.id = id;
        this.displayName = displayName;
        this.email = email;
        this.rating = rating;
    }

    public getInfo(){
        return {
            id:this.id,
            displayName:this.displayName,
            email:this.email,
            rating:this.rating
        }
    }

}