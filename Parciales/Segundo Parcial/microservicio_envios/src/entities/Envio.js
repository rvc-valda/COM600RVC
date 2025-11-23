const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity('envios')
class Envio {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  usuario_id;

  @Column()
  vehiculo_id;

  @Column()
  origen;

  @Column()
  destino;

  @Column({ type: 'date' })
  fecha_envio;

  @Column({ default: 'pendiente' })
  estado;
}

module.exports = Envio;