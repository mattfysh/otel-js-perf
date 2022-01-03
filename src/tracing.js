const opentelemetry = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda')
const { AWSXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray')
const { AWSXRayPropagator } = require('@opentelemetry/propagator-aws-xray')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-proto')

const { ConsoleSpanExporter, BatchSpanProcessor } = opentelemetry.tracing

const exporter = process.env.CONSOLE_DEBUG
  ? new ConsoleSpanExporter()
  : new OTLPTraceExporter()

const spanProcessor = new BatchSpanProcessor(exporter)

const sdk = new opentelemetry.NodeSDK({
  autoDetectResources: false, // sdk.start() will be sync
  spanProcessor,
  textMapPropagator: new AWSXRayPropagator(),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new AwsLambdaInstrumentation(),
  ],
})

sdk._tracerProviderConfig.tracerConfig.idGenerator = new AWSXRayIdGenerator()
sdk.start()
