import HomePage from "./pages/pokemon/HomePage";

interface HomeProps{
  searchParams:{ [key: string]: string | string[] | undefined };
}



export default function Home({searchParams}:HomeProps) {
  console.log(searchParams);
  return (
    // <Provider store={store}>
    //   <HomePage />
    
    // </Provider>
    <HomePage page={searchParams}/>
  );
}
