import "../styles/tailwind.css";
import { AppProps } from "next/app";
import QuakerMagicUserProvider from "@lib/wrapper/provider";

function QuakerApp({ Component, pageProps }: AppProps) {
	return (
		<QuakerMagicUserProvider>
			<Component {...pageProps} />
		</QuakerMagicUserProvider>
	);
}

export default QuakerApp;
