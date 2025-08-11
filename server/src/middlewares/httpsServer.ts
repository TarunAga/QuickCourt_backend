import https from 'https';
import fs from 'fs';
import path from 'path';
import { Application } from 'express';

export class HttpsServer {
  /**
   * Create HTTPS server if certificates are available
   * For development, you can create self-signed certificates using:
   * openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
   */
  static createServer(app: Application, port: number): void {
    const keyPath = path.join(__dirname, '../../../certs/key.pem');
    const certPath = path.join(__dirname, '../../../certs/cert.pem');

    // Check if SSL certificates exist
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      const privateKey = fs.readFileSync(keyPath, 'utf8');
      const certificate = fs.readFileSync(certPath, 'utf8');
      
      const credentials = {
        key: privateKey,
        cert: certificate
      };

      const httpsServer = https.createServer(credentials, app);
      
      httpsServer.listen(port, () => {
        console.log(`🔒 HTTPS Server is running on port ${port}`);
        console.log(`🔒 Secure Health check: https://localhost:${port}/health`);
        console.log(`🔒 Secure API Base: https://localhost:${port}/api/v1.0`);
      });
    } else {
      console.log('⚠️  SSL certificates not found. Running HTTP server.');
      console.log('⚠️  For production, please set up HTTPS with valid certificates.');
      
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Health check: http://localhost:${port}/health`);
        console.log(`API Base: http://localhost:${port}/api/v1.0`);
      });
    }
  }

  /**
   * Force HTTPS redirect middleware for production
   */
  static forceHttps(req: any, res: any, next: any): void {
    if (process.env.NODE_ENV === 'production') {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
        return;
      }
    }
    next();
  }
}
