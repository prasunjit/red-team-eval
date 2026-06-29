import logging
import os
import sys
from concurrent import futures

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'pb'))

import grpc
from pb import arena_pb2
from pb import arena_pb2_grpc


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class ArenaService(arena_pb2_grpc.ArenaServiceServicer):
    def CreateAttack(self, request, context):
        logging.info(f"Received CreateAttack request: {request}")
        response = arena_pb2.CreateAttackResponse(
            attack_id="attack123",
            attack_command_generator=arena_pb2.AttackCommandGenerator(
                command="malicious_command"
            )
        )
        logging.info(f"Sending CreateAttack response: {response}")
        return response

    def DefendAttack(self, request, context):
        logging.info(f"Received DefendAttack request: {request}")
        response = arena_pb2.DefendAttackResponse(
            attack_id=request.attack_id,
            success=True,
            defense_action=arena_pb2.DefenseAction.BLOCK_IP,
            target_system=arena_pb2.TargetSystem(system_id="system123", system_type="web_server", ip_address="192.168.1.1"),
            attack_mitigation_details="Blocked malicious traffic",
            confidence_level=arena_pb2.ConfidenceLevel(confidence_score=0.9, confidence_description="High confidence in mitigation")
        )
        logging.info(f"Sending DefendAttack response: {response}")
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    arena_pb2_grpc.add_ArenaServiceServicer_to_server(ArenaService(), server)
    server.add_insecure_port('[::]:50051')
    logging.info("Starting server on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()