export class ServerAwsSesConfig {
    constructor(
        public AWS_ACCESS_KEY_ID: string,
        public AWS_SECRET_ACCESS_KEY: string,
        public AWS_REGION: string,
        public Source: string
    ) { }
}
