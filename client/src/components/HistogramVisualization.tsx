import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HistogramVisualizationProps {
  rgbHistogram: {
    red: number[];
    green: number[];
    blue: number[];
  };
}

export function HistogramVisualization({ rgbHistogram }: HistogramVisualizationProps) {
  const prepareHistogramData = (channel: number[]) => {
    return channel.map((value, index) => ({
      bin: index,
      value,
    }));
  };

  const prepareLuminanceData = () => {
    const luminanceData: number[] = new Array(256).fill(0);
    
    for (let i = 0; i < 256; i++) {
      luminanceData[i] = 
        rgbHistogram.red[i] * 0.299 +
        rgbHistogram.green[i] * 0.587 +
        rgbHistogram.blue[i] * 0.114;
    }
    
    return luminanceData.map((value, index) => ({
      bin: index,
      value,
    }));
  };

  const prepareRGBData = () => {
    return rgbHistogram.red.map((_, index) => ({
      bin: index,
      red: rgbHistogram.red[index],
      green: rgbHistogram.green[index],
      blue: rgbHistogram.blue[index],
    }));
  };

  const redData = prepareHistogramData(rgbHistogram.red);
  const greenData = prepareHistogramData(rgbHistogram.green);
  const blueData = prepareHistogramData(rgbHistogram.blue);
  const luminanceData = prepareLuminanceData();
  const rgbData = prepareRGBData();

  return (
    <Card>
      <CardHeader className="space-y-0 pb-4">
        <CardTitle className="text-lg">Histogram Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rgb" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="rgb" data-testid="tab-rgb">RGB</TabsTrigger>
            <TabsTrigger value="red" data-testid="tab-red">Red</TabsTrigger>
            <TabsTrigger value="green" data-testid="tab-green">Green</TabsTrigger>
            <TabsTrigger value="blue" data-testid="tab-blue">Blue</TabsTrigger>
            <TabsTrigger value="luminance" data-testid="tab-luminance">Luma</TabsTrigger>
          </TabsList>

          <TabsContent value="rgb" className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={rgbData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="bin" 
                  domain={[0, 255]}
                  ticks={[0, 64, 128, 192, 255]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="red" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.3}
                  strokeWidth={1.5}
                />
                <Area 
                  type="monotone" 
                  dataKey="green" 
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.3}
                  strokeWidth={1.5}
                />
                <Area 
                  type="monotone" 
                  dataKey="blue" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="red" className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={redData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="bin" 
                  domain={[0, 255]}
                  ticks={[0, 64, 128, 192, 255]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="green" className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={greenData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="bin" 
                  domain={[0, 255]}
                  ticks={[0, 64, 128, 192, 255]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="blue" className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={blueData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="bin" 
                  domain={[0, 255]}
                  ticks={[0, 64, 128, 192, 255]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="luminance" className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={luminanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="bin" 
                  domain={[0, 255]}
                  ticks={[0, 64, 128, 192, 255]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--foreground))" 
                  fill="hsl(var(--foreground))" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
