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
	protocol: "https",
	host: "murmuring-wildwood-07967.herokuapp.com",
};

const enviroment = process.env.REACT_APP_ENV === 'development' ? dev : prod;

const config = {
	...{
		...common,
		...enviroment
	}
}

export default config;