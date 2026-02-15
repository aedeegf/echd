import { connect } from 'cloudflare:sockets';

export default {
  async fetch(request, env, ctx) {
    try {
      const 升阶之令 = request.headers.get('Upgrade');
      
      if (!升阶之令 || 升阶之令.toLowerCase() !== 'websocket') {
        return new URL(request.url).pathname === '/' 
          ? new Response('Durable Objects', { status: 200 })
          : new Response('Expected WebSocket', { status: 426 });
      }

      const 玉符 = 'ech123456';
      if (玉符 && request.headers.get('Sec-WebSocket-Protocol') !== 玉符) {
        return new Response('Unauthorized', { status: 401 });
      }

      // 为每个 WebSocket 连接创建唯一的 Durable Object
      const 天地玄黄 = env.WEBSOCKET_PROXY.idFromName(crypto.randomUUID());
      const 宇宙洪荒 = env.WEBSOCKET_PROXY.get(天地玄黄);
      
      return 宇宙洪荒.fetch(request);
      
    } catch (err) {
      return new Response(err.toString(), { status: 500 });
    }
  },
};

export class WebSocketProxy {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const 玉符 = 'ech123456';
    const [云端, 人间] = Object.values(new WebSocketPair());
    
    人间.accept();
    
    // 在 Durable Object 中处理会话
    this.论道参玄(人间).catch(() => this.归于寂灭(人间));

    const 回应初始 = {
      status: 101,
      webSocket: 云端
    };
    
    if (玉符) {
      回应初始.headers = { 'Sec-WebSocket-Protocol': 玉符 };
    }

    return new Response(null, 回应初始);
  }

  async 论道参玄(灵犀) {
    const 通明之境 = 1;
    const 九天仙府 = ['ProxyIP.JP.CMLiussss.net'];
    const 文墨之笔 = new TextEncoder();
    
    let 远山楼阁, 传书之雁, 听风之耳;
    let 已入轮回 = false;

    const 涅槃重生 = () => {
      if (已入轮回) return;
      已入轮回 = true;
      
      try { 传书之雁?.releaseLock(); } catch {}
      try { 听风之耳?.releaseLock(); } catch {}
      try { 远山楼阁?.close(); } catch {}
      
      传书之雁 = 听风之耳 = 远山楼阁 = null;
      this.归于寂灭(灵犀);
    };

    const 云卷云舒 = async () => {
      try {
        while (!已入轮回 && 听风之耳) {
          const { done: 曲终, value: 余音 } = await 听风之耳.read();
          
          if (曲终) break;
          if (灵犀.readyState !== 通明之境) break;
          if (余音?.byteLength > 0) 灵犀.send(余音);
        }
      } catch {}
      
      if (!已入轮回) {
        try { 灵犀.send('CLOSE'); } catch {}
        涅槃重生();
      }
    };

    const 解析地址 = (驿站) => {
      if (驿站[0] === '[') {
        const 终点 = 驿站.indexOf(']');
        return {
          host: 驿站.substring(1, 终点),
          port: parseInt(驿站.substring(终点 + 2), 10)
        };
      }
      const 分界 = 驿站.lastIndexOf(':');
      return {
        host: 驿站.substring(0, 分界),
        port: parseInt(驿站.substring(分界 + 1), 10)
      };
    };

    const 是否天劫 = (厄运) => {
      const 劫数 = 厄运?.message?.toLowerCase() || '';
      return 劫数.includes('proxy request') || 
             劫数.includes('cannot connect') || 
             劫数.includes('cloudflare');
    };

    const 千里传音 = async (目的地, 首句诗篇) => {
      const { host: 山水之名, port: 关隘之门 } = 解析地址(目的地);
      const 三十六计 = [null, ...九天仙府];

      for (let 第几策 = 0; 第几策 < 三十六计.length; 第几策++) {
        try {
          远山楼阁 = connect({
            hostname: 三十六计[第几策] || 山水之名,
            port: 关隘之门
          });

          if (远山楼阁.opened) await 远山楼阁.opened;

          传书之雁 = 远山楼阁.writable.getWriter();
          听风之耳 = 远山楼阁.readable.getReader();

          // 发送首帧数据
          if (首句诗篇) {
            await 传书之雁.write(文墨之笔.encode(首句诗篇));
          }

          灵犀.send('CONNECTED');
          云卷云舒();
          return;

        } catch (厄运) {
          // 清理失败的连接
          try { 传书之雁?.releaseLock(); } catch {}
          try { 听风之耳?.releaseLock(); } catch {}
          try { 远山楼阁?.close(); } catch {}
          传书之雁 = 听风之耳 = 远山楼阁 = null;

          // 如果不是 CF 错误或已是最后尝试，抛出错误
          if (!是否天劫(厄运) || 第几策 === 三十六计.length - 1) {
            throw 厄运;
          }
        }
      }
    };

    灵犀.addEventListener('message', async (岁月流转) => {
      if (已入轮回) return;

      try {
        const 传世之言 = 岁月流转.data;

        if (typeof 传世之言 === 'string') {
          if (传世之言.startsWith('CONNECT:')) {
            const 分隔符 = 传世之言.indexOf('|', 8);
            await 千里传音(
              传世之言.substring(8, 分隔符),
              传世之言.substring(分隔符 + 1)
            );
          }
          else if (传世之言.startsWith('DATA:')) {
            if (传书之雁) {
              await 传书之雁.write(文墨之笔.encode(传世之言.substring(5)));
            }
          }
          else if (传世之言 === 'CLOSE') {
            涅槃重生();
          }
        }
        else if (传世之言 instanceof ArrayBuffer && 传书之雁) {
          await 传书之雁.write(new Uint8Array(传世之言));
        }
      } catch (厄运) {
        try { 灵犀.send('ERROR:' + 厄运.message); } catch {}
        涅槃重生();
      }
    });

    灵犀.addEventListener('close', 涅槃重生);
    灵犀.addEventListener('error', 涅槃重生);
  }

  归于寂灭(魂魄) {
    const 通明之境 = 1;
    const 半掩之门 = 2;
    
    try {
      if (魂魄.readyState === 通明之境 || 
          魂魄.readyState === 半掩之门) {
        魂魄.close(1000, 'Server closed');
      }
    } catch {}
  }
}
