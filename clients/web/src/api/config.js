// common configuration
const common = {
	path: "/api/v1",
}

// development configuration
const dev = {
	protocol: "http",
	host: "localhost:8080",
};

// production configuration
const prod = {
	protocol: "http",
	host: "localhost:8081",
}

const enviroment = process.env.REACT_APP_ENV === 'dev' ? dev : prod;

const config = {
	...{
		...common,
		...enviroment
	}
}

export default config;