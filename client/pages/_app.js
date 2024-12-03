import "@/styles/globals.scss";
import { AudioProvider } from '@/context/AudioContext';

export default function App({ Component, pageProps }) {
  return (
    <AudioProvider>
      <Component {...pageProps} />
    </AudioProvider>
  );
}
