const mongoose = require('mongoose');

// eslint-disable-next-line no-var, prefer-destructuring
const Schema = mongoose.Schema;

const PedidoSchema = mongoose.Schema(
  {
    user_id: { type: Schema.ObjectId, ref: 'User', required: true },
    itens: [{ type: Schema.Types.ObjectId, ref: 'PedidoIten' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pedido', PedidoSchema);
