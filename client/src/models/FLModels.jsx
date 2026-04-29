import dayjs from "dayjs";

export function Film(id, title, isFavorite = false, watchDate, rating, userId = 1){
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    if(watchDate)
        this.watchDate = dayjs(watchDate);
    if(rating)
        this.rating = rating;
    this.userId=userId;

    this.serialize = () => {
        return {id: this.id, title: this.title, isFavorite: this.isFavorite, watchDate: this.watchDate?.format("YYYY-MM-DD"), rating: this.rating};
    }
}