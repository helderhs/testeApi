const mongoose = require('mongoose');

// eslint-disable-next-line no-var, prefer-destructuring
const Schema = mongoose.Schema;

const PedidoItenSchema = mongoose.Schema(
  {
    pedido_id: { type: Schema.Types.ObjectId, ref: 'Pedido', required: true },
    item_id: { type: String },
    title: { type: String },
    brand: { type: String },
    price: { type: String },
    age: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PedidoIten', PedidoItenSchema);
