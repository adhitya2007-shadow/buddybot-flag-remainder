import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Camera, X, CheckCircle, AlertCircle } from 'lucide-react';
import QrScanner from 'qr-scanner';

interface PartDetails {
  id: string;
  name: string;
  type: string;
  manufacturingDate: string;
  installationDate: string;
  location: string;
  status: 'Active' | 'Maintenance' | 'Replacement Due';
  nextMaintenance: string;
  specifications: Record<string, string>;
}

const QRScannerComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [partDetails, setPartDetails] = useState<PartDetails | null>(null);

  // Mock part details database
  const mockPartDatabase: Record<string, PartDetails> = {
    'RP001': {
      id: 'RP001',
      name: 'Railway Wheel Set',
      type: 'Rolling Stock',
      manufacturingDate: '2024-03-15',
      installationDate: '2024-04-20',
      location: 'Mumbai Central Station - Platform 3',
      status: 'Active',
      nextMaintenance: '2024-12-15',
      specifications: {
        'Diameter': '920mm',
        'Material': 'EN13262 Grade',
        'Load Capacity': '22.5 tons',
        'Speed Rating': '160 km/h'
      }
    },
    'RP002': {
      id: 'RP002',
      name: 'Rail Track Section',
      type: 'Infrastructure',
      manufacturingDate: '2024-01-10',
      installationDate: '2024-02-28',
      location: 'Delhi Junction - Track 7',
      status: 'Maintenance',
      nextMaintenance: '2024-10-20',
      specifications: {
        'Length': '12m',
        'Weight': '60kg/m',
        'Grade': 'UIC 60',
        'Hardness': '320 HB'
      }
    },
    'RP003': {
      id: 'RP003',
      name: 'Signal Controller',
      type: 'Signaling',
      manufacturingDate: '2023-11-05',
      installationDate: '2024-01-15',
      location: 'Chennai Central - Junction Box 12',
      status: 'Replacement Due',
      nextMaintenance: '2024-09-30',
      specifications: {
        'Voltage': '24V DC',
        'Current': '5A',
        'Protection': 'IP65',
        'Operating Temp': '-40°C to +85°C'
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.destroy();
      }
    };
  }, [scanner]);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setIsScanning(true);
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedData(result.data);
          const details = mockPartDatabase[result.data];
          setPartDetails(details || null);
          stopScanning();
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await qrScanner.start();
      setScanner(qrScanner);
    } catch (error) {
      console.error('Error starting scanner:', error);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.destroy();
      setScanner(null);
    }
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedData(null);
    setPartDetails(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Maintenance': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Replacement Due': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Maintenance': case 'Replacement Due': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <QrCode className="w-4 h-4 mr-2" />
            QR Scanner
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Scan Railway Components
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use your camera to scan QR codes on railway parts and get instant access to detailed information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!partDetails ? (
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5" />
                  QR Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                      <div className="text-center space-y-4">
                        <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">Click "Start Scanning" to begin</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-4">
                  {!isScanning ? (
                    <Button onClick={startScanning} variant="railway" size="lg">
                      <Camera className="w-5 h-5 mr-2" />
                      Start Scanning
                    </Button>
                  ) : (
                    <Button onClick={stopScanning} variant="outline" size="lg">
                      <X className="w-5 h-5 mr-2" />
                      Stop Scanning
                    </Button>
                  )}
                </div>

                {scannedData && !partDetails && (
                  <Card className="bg-amber-500/10 border-amber-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-amber-600">
                        <AlertCircle className="w-5 h-5" />
                        <p>Part not found in database: <code className="bg-amber-500/20 px-2 py-1 rounded">{scannedData}</code></p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Demo QR Codes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground md:col-span-3 text-center mb-4">
                    Try scanning these demo codes: RP001, RP002, RP003
                  </p>
                  {['RP001', 'RP002', 'RP003'].map((code) => (
                    <Button
                      key={code}
                      variant="outline"
                      onClick={() => {
                        setScannedData(code);
                        setPartDetails(mockPartDatabase[code]);
                      }}
                      className="text-sm"
                    >
                      Demo: {code}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{partDetails.name}</CardTitle>
                  <Button onClick={resetScanner} variant="outline" size="sm">
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan Another
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{partDetails.type}</Badge>
                  <Badge className={getStatusColor(partDetails.status)}>
                    {getStatusIcon(partDetails.status)}
                    {partDetails.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Basic Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Part ID:</span>
                        <span className="font-mono">{partDetails.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Manufacturing:</span>
                        <span>{partDetails.manufacturingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Installation:</span>
                        <span>{partDetails.installationDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Maintenance:</span>
                        <span>{partDetails.nextMaintenance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-muted-foreground">{partDetails.location}</p>
                    
                    <h3 className="font-semibold text-lg">Specifications</h3>
                    <div className="space-y-2">
                      {Object.entries(partDetails.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
                  <Button variant="railway">
                    Schedule Maintenance
                  </Button>
                  <Button variant="outline">
                    View History
                  </Button>
                  <Button variant="outline">
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default QRScannerComponent;