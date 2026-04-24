import dayjs from 'dayjs'

export function Film(id, title, isFavorite = false, watchDate, rating, userId = 1){
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    if(watchDate)
        this.watchDate = dayjs(watchDate);
    if(rating)
        this.rating = rating;
    this.userId=userId;

    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${this.watchDate?.format("MMMM DD, YYYY")}, Rating: ${this.rating}, User id: ${this.userId}`;
    }

    //Id: 1, Title: Pulp Fiction, isFavorite: true, Watch date: March 10, 2025, Rating: 5, User id: 1

}