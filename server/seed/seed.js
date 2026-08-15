import "dotenv/config.js";
import { connectDB } from "../config/db.js";
import Movie from "../models/Movie.js";

const sample = [
  {
    title: "Inception",
    year: 2010,
    genres: ["Action", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    trailerYouTubeId: "YoHD9XEInc0"
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genres: ["Action", "Crime"],
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerYouTubeId: "EXeTwQWrcwY"
  },
  {
    title: "Interstellar",
    year: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailerYouTubeId: "zSWdZVtXT7E"
  },
  {
    title: "The Matrix",
    year: 1999,
    genres: ["Action", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailerYouTubeId: "m8e-FF8MsqU"
  },
  {
    title: "Gladiator",
    year: 2000,
    genres: ["Action", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    trailerYouTubeId: "owK1qxDselE"
  },
  {
    title: "Avatar",
    year: 2009,
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    trailerYouTubeId: "5PSNL1qE6VY"
  },
  {
    title: "Titanic",
    year: 1997,
    genres: ["Drama", "Romance"],
    posterUrl: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    trailerYouTubeId: "2e-eXJ6HgkQ"
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    trailerYouTubeId: "TcMBFSGVi1c"
  },
  {
    title: "Iron Man",
    year: 2008,
    genres: ["Action", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    trailerYouTubeId: "8hYlB38asDY"
  },
  {
    title: "Doctor Strange",
    year: 2016,
    genres: ["Action", "Fantasy", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/gwi5kQJY2fE7BgPKdAqpC3Y1eUn.jpg",
    trailerYouTubeId: "HSzx-zryEgM"
  },
  {
    title: "Black Panther",
    year: 2018,
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    trailerYouTubeId: "xjDjIWPwcPU"
  },
  {
    title: "Spider-Man: No Way Home",
    year: 2021,
    genres: ["Action", "Adventure", "Fantasy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    trailerYouTubeId: "JfVOs4VSpmA"
  },
  {
    title: "Thor: Ragnarok",
    year: 2017,
    genres: ["Action", "Adventure", "Fantasy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    trailerYouTubeId: "ue80QwXMRHg"
  },
  {
    title: "Guardians of the Galaxy",
    year: 2014,
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg",
    trailerYouTubeId: "d96cjJhvlMA"
  },
  {
    title: "Captain America: Civil War",
    year: 2016,
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    trailerYouTubeId: "FkTybqcX-Yo"
  },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    year: 2021,
    genres: ["Action", "Adventure", "Fantasy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    trailerYouTubeId: "8YjFbMbfXaQ"
  },
  {
    title: "Eternals",
    year: 2021,
    genres: ["Action", "Adventure", "Fantasy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/b6qUu00iIIkXX13szFy7d0CyNcg.jpg",
    trailerYouTubeId: "x_me3xsvDgk"
  },
  {
    title: "Avengers: Infinity War",
    year: 2018,
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    trailerYouTubeId: "6ZfuNTqbHE8"
  },
  {
    title: "Deadpool",
    year: 2016,
    genres: ["Action", "Comedy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
    trailerYouTubeId: "ONHBaC-pfsk"
  },
  {
    title: "Deadpool 2",
    year: 2018,
    genres: ["Action", "Comedy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
    trailerYouTubeId: "D86RtevtfrA"
  },
];


(async () => {
  await connectDB(process.env.MONGO_URI);
  await Movie.deleteMany({});
  await Movie.insertMany(sample);
  console.log("🌱 Seeded movies");
  process.exit(0);
})();
