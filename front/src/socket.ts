import { io, Socket } from 'socket.io-client'
import type SocketEvents from '../../shared/socketEvents'
import config from '../../config'

export default (config.front.socketEnabled ? io() as Socket<SocketEvents> : null )