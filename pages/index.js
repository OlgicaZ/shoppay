import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  
  const { data: session } = useSession();
  console.log(session);
  
  return (
    <>
      <Header country={country} />
      {
        session ? "you are logged in" : "you are not logged in"
      }
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {

  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=48r8imldliuo1abb")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

    return {
      props: {
        // country: {
        //   name: data.name,
        //   flag: data.flag.emojitwo
        // },
        country: {
            name: 'Macedonia',
            flag: 'https://cdn.britannica.com/08/6208-004-61460B40/Flag-North-Macedonia.jpg'
          },
      },
    }
}
