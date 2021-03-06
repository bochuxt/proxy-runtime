import { getBaseContext, getContext, getRootContext, ensureContext, ensureRootContext, deleteContext } from "./runtime";

///// CALLS IN
type FilterStatus = i32;
type FilterHeadersStatus = i32;
type FilterMetadataStatus = i32;
type FilterTrailersStatus = i32;
type FilterDataStatus = i32;
type GrpcStatus = i32;
type WasmOnDoneResult = u32;

// Calls in.
export function proxy_abi_version_0_1_0(): void { }

export function proxy_on_vm_start(root_context_id: u32, configuration_size: u32): u32 {
  let root_context = getRootContext(root_context_id);
  return root_context.onStart_(root_context, configuration_size) ? 1 : 0;
}
export function proxy_on_start(root_context_id: u32, vm_configuration_size: u32): u32 {
  ensureRootContext(root_context_id);
  let root_context = getRootContext(root_context_id);
  return root_context.onStart_(root_context, vm_configuration_size) ? 1 : 0;
}
export function proxy_validate_configuration(root_context_id: u32, configuration_size: u32): u32 {
  let root_context = getRootContext(root_context_id);
  return root_context.validateConfiguration_(root_context, configuration_size) ? 1 : 0;
}
export function proxy_on_configure(root_context_id: u32, configuration_size: u32): u32 {
  let root_context = getRootContext(root_context_id);
  return root_context.onConfigure_(root_context, configuration_size) ? 1 : 0;
}
export function proxy_on_tick(root_context_id: u32): void {
  let root_context = getRootContext(root_context_id);
  root_context.onTick_(root_context);
}
export function proxy_on_queue_ready(root_context_id: u32, token: u32): void {
  let root_context = getRootContext(root_context_id);
  root_context.onQueueReady_(root_context, token);
}

// Stream calls.
export function proxy_on_context_create(context_id: u32, root_context_id: u32): void {
  if (root_context_id != 0) {
    ensureContext(context_id, root_context_id);
  } else {
    ensureRootContext(context_id);
  }
}

export function proxy_on_create(context_id: u32, root_context_id: u32): void {
  proxy_on_context_create(context_id, root_context_id);
}

export function proxy_on_request_headers(context_id: u32, headers: u32): FilterHeadersStatus {
  let ctx = getContext(context_id);
  return ctx.onRequestHeaders_(ctx, headers) as FilterHeadersStatus;
}
export function proxy_on_request_body(context_id: u32, body_buffer_length: u32, end_of_stream: u32): FilterDataStatus {
  let ctx = getContext(context_id);
  return ctx.onRequestBody_(ctx, body_buffer_length, end_of_stream != 0) as FilterDataStatus;
}
export function proxy_on_request_trailers(context_id: u32, trailers: u32): FilterTrailersStatus {
  let ctx = getContext(context_id);
  return ctx.onRequestTrailers_(ctx, trailers) as FilterTrailersStatus;
}
export function proxy_on_request_metadata(context_id: u32, nelements: u32): FilterMetadataStatus {
  let ctx = getContext(context_id);
  return ctx.onRequestMetadata_(ctx, nelements) as FilterMetadataStatus;
}
export function proxy_on_response_headers(context_id: u32, headers: u32): FilterHeadersStatus {
  let ctx = getContext(context_id);
  return ctx.onResponseHeaders_(ctx, headers) as FilterHeadersStatus;
}
export function proxy_on_response_body(context_id: u32, body_buffer_length: u32, end_of_stream: u32): FilterDataStatus {
  let ctx = getContext(context_id);
  return ctx.onResponseBody_(ctx, body_buffer_length, end_of_stream != 0) as FilterDataStatus;
}
export function proxy_on_response_trailers(context_id: u32, trailers: u32): FilterTrailersStatus {
  let ctx = getContext(context_id);
  return ctx.onResponseTrailers_(ctx, trailers) as FilterTrailersStatus;
}
export function proxy_on_response_metadata(context_id: u32, nelements: u32): FilterMetadataStatus {
  let ctx = getContext(context_id);
  return ctx.onResponseMetadata_(ctx, nelements) as FilterMetadataStatus;
}

// HTTP/gRPC.
export function proxy_on_http_call_response(context_id: u32, token: u32, headers: u32, body_size: u32, trailers: u32): void {
  let ctx = getRootContext(context_id);
  ctx.onHttpCallResponse_(ctx, token, headers, body_size, trailers);
}
export function proxy_on_grpc_create_initial_metadata(context_id: u32, token: u32, headers: u32): void {
  getRootContext(context_id).on_grpc_create_initial_metadata(token, headers)
}
export function proxy_on_grpc_receive_initial_metadata(context_id: u32, token: u32, headers: u32): void {
  getRootContext(context_id).on_grpc_receive_initial_metadata(token, headers)
}
export function proxy_on_grpc_trailing_metadata(context_id: u32, token: u32, trailers: u32): void {
  getRootContext(context_id).on_grpc_trailing_metadata(token, trailers)
}
export function proxy_on_grpc_receive(context_id: u32, token: u32, response_size: u32): void {
  getRootContext(context_id).on_grpc_receive(token, response_size)
}
export function proxy_on_grpc_close(context_id: u32, token: u32, status_code: u32): void {
  getRootContext(context_id).on_grpc_close(token, status_code)
}

// The stream/vm has completed.

export function proxy_on_done(context_id: u32): u32 {
  let ctx = getBaseContext(context_id);
  return ctx.onDone_(ctx) ? 1 : 0;
}

// proxy_on_log occurs after proxy_on_done.
export function proxy_on_log(context_id: u32): void {
  let ctx = getContext(context_id);
  ctx.onLog_(ctx);
}
// The Context in the proxy has been destroyed and no further calls will be coming.
export function proxy_on_delete(context_id: u32): void {
  let ctx = getBaseContext(context_id);
  ctx.onDelete_(ctx);
  deleteContext(context_id);
}