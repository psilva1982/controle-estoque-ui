module.exports = () => {
    const data = { clientes: [] }
    var casual = require('casual').pt_BR;

    // Create 50 clientes
    for (let i = 0; i < 50; i++) {
      data.clientes.push({ 
        id: i, 
        nome: casual.full_name,
        email: casual.email,
        telefone: casual.phone,
        nascimento: casual.date(format = 'YYYY-MM-DD'),
        endereco: { 
          cidade: casual.city, 
          estado: casual.state_abbr,
          logradouro: casual.address1,
          cep: casual.zip 
        },
        ativo: true
      })
    }
    return data
  }