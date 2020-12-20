import config from 'config'

export const generatePlainActivationEmail = (activationCode: string): string => `Dobrý den, váš účet správce objednávek můžete aktivovat na následující adrese: ${config.get('client.domain')}/aktivace/${activationCode}`

export const generateHtmlActivationEmail = (activationCode: string): string => `
    <p>Dobrý den,</p>
    <br/>
    <p>váš účet správce objednávek můžete aktivovat na <a href=${config.get('client.domain')}/aktivace/${activationCode}>tomto odkazu</a></p>
    <br/>
    <p>S pozdravem,</p>
    <br/>
    <p>tým <a href=${config.get('client.domain')}>správce objednávek</a></p>
`
